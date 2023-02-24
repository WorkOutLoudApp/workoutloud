interface Exercise {
    name: string;
    description: string;
    target: string;
    equipment: string;
    bodyPart: string;
    gifUrl: string;
  }
  
  const API_KEY = '4beaf48415mshbf2ce385781a119p15b69ejsnfd3c06c001ec';
  
  export const searchExercises = async (searchTerm: string): Promise<Exercise[]> => {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises?search=${searchTerm}`, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    const data = await response.json();
    return data;
  };
  