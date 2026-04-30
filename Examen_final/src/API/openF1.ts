// 1. Interface pour les pilotes
export interface Driver {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  country_code: string;
}

// 2.Interface pour les écuries (teams)
// TODO: Ajouter les images des écuries si possible.
export interface Team {
  team_name: string;
  team_colour: string;
}

// 3. Fonction pour récupérer les pilotes depuis l'API OpenF1
export const fetchDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await fetch('https://api.openf1.org/v1/drivers?session_key=9158');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const data: Driver[] = await response.json();
    
    const uniqueDrivers = data.reduce((acc: Driver[], current) => {
      const x = acc.find(item => item.driver_number === current.driver_number);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return uniqueDrivers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 4. Fonction pour extraire les écuries uniques à partir des pilotes
export const extractUniqueTeams = (drivers: Driver[]): Team[] => {
  const teamsMap = new Map<string, string>();

  // On parcourt tous les pilotes et on enregistre l'écurie si elle n'est pas déjà dans notre Map
  drivers.forEach(driver => {
    // On s'assure que le pilote a bien une écurie assignée pour éviter les erreurs
    if (driver.team_name && !teamsMap.has(driver.team_name)) {
      teamsMap.set(driver.team_name, driver.team_colour);
    }
  });

  // On transforme notre Map en un beau tableau d'objets respectant l'interface Team
  return Array.from(teamsMap, ([team_name, team_colour]) => ({
    team_name,
    team_colour
  }));
};