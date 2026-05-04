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

// --- UTILITAIRES ---

//Améliore la qualité de l'image headshot fournie par OpenF1.
const getHighQualityHeadshot = (url: string): string => {
  if (!url) return "";
  return url.replace("1col", "5col");
};


const removeDuplicateDrivers = (drivers: Driver[]): Driver[] => {
  const seen = new Set<number>();
  return drivers.filter((driver) => {
    if (seen.has(driver.driver_number)) return false;
    seen.add(driver.driver_number);
    return true;
  });
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
    const response = await fetch(`${BASE_URL}/drivers?meeting_key=${meetingKey}`);
    if (!response.ok) throw new Error("Erreur fetchDrivers");

    const data: Driver[] = await response.json();

    const unique = removeDuplicateDrivers(data);

    // Améliore la qualité de chaque headshot
    return unique.map((driver) => ({
      ...driver,
      headshot_url: getHighQualityHeadshot(driver.headshot_url),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

/** Extrait la liste des écuries uniques à partir d'une liste de pilotes. */
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