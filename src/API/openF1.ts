const BASE_URL = "https://api.openf1.org/v1";

// --- INTERFACES ---

export interface Driver {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  country_code: string;
  session_key: number;
  best_lap_time?: number;
}

export interface Team {
  team_name: string;
  team_colour: string;
}

export interface Meeting {
  meeting_key: number;
  meeting_name: string;
  country_name: string;
}

export interface Lap {
  driver_number: number;
  lap_duration: number;
  is_pit_out_lap: boolean;
}

// --- UTILITAIRES ---

//Améliore la qualité de l'image headshot fournie par OpenF1.
const getHighQualityHeadshot = (url: string): string => {
  if (!url) return "";
  return url.replace("1col", "5col");
};

// sert comme un filtre pour éviter les doublons de pilotes dans une même course (bug de l'API)
const removeDuplicateDrivers = (drivers: Driver[]): Driver[] => {
  const seen = new Set<number>();
  return drivers.filter((driver) => {
    if (seen.has(driver.driver_number)) return false;
    seen.add(driver.driver_number);
    return true;
  });
};

/** Formatage du temps : 84.123 -> "1:24.123" */
export const formatLapTime = (seconds: number | undefined): string => {
  if (!seconds || isNaN(seconds)) return "--:--.---";
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3);
  return `${mins}:${secs.padStart(6, "0")}`;
};

// --- FONCTIONS API ---

/** Récupère toutes les courses (meetings) d'une année donnée. */
export const fetchMeetings = async (year: string): Promise<Meeting[]> => {
  try {
    const response = await fetch(`${BASE_URL}/meetings?year=${year}`);
    if (!response.ok) throw new Error("Erreur fetchMeetings");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/** Récupère les pilotes d'une course (meeting_key), sans doublons et en haute qualité. */
export const fetchDrivers = async (meetingKey: number): Promise<Driver[]> => {
  try {
    // 1. Récupérer les pilotes
    const driverRes = await fetch(`${BASE_URL}/drivers?meeting_key=${meetingKey}`);
    if (!driverRes.ok) throw new Error("Erreur lors de la récupération des pilotes");
    
    const rawDrivers: Driver[] = await driverRes.json();
    const uniqueDrivers = removeDuplicateDrivers(rawDrivers);

    if (uniqueDrivers.length === 0) return [];

    // On récupère la session_key du premier pilote pour chercher les laps de cette course
    const sessionKey = uniqueDrivers[0].session_key;

    // 2. Récupérer tous les tours de la session
    const lapRes = await fetch(`${BASE_URL}/laps?session_key=${sessionKey}`);
    let bestLapsMap: Record<number, number> = {};

    if (lapRes.ok) {
      const allLaps: Lap[] = await lapRes.json();
      
      // On calcule le meilleur tour pour chaque pilote
      allLaps.forEach((lap) => {
        if (lap.lap_duration && !lap.is_pit_out_lap) {
          if (!bestLapsMap[lap.driver_number] || lap.lap_duration < bestLapsMap[lap.driver_number]) {
            bestLapsMap[lap.driver_number] = lap.lap_duration;
          }
        }
      });
    }

    // 3. Fusionner les données
    return uniqueDrivers.map((driver) => ({
      ...driver,
      headshot_url: getHighQualityHeadshot(driver.headshot_url),
      best_lap_time: bestLapsMap[driver.driver_number] || undefined,
    }));

  } catch (error) {
    console.error("Erreur fetchDrivers enriched:", error);
    return [];
  }
};

/** Extrait la liste des écuries uniques. */
export const extractUniqueTeams = (drivers: Driver[]): Team[] => {
  const teamsMap = new Map<string, string>();

  drivers.forEach(({ team_name, team_colour }) => {
    if (team_name && !teamsMap.has(team_name)) {
      teamsMap.set(team_name, team_colour);
    }
  });

  return Array.from(teamsMap, ([team_name, team_colour]) => ({
    team_name,
    team_colour,
  }));
};