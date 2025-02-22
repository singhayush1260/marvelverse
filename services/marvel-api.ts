import axios from "axios";
import md5 from "md5";

const publicKey = process.env.EXPO_PUBLIC_PUBLIC_KEY as string;
const privateKey = process.env.EXPO_PUBLIC_PRIVATE_KEY as string;
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const baseURL = "https://gateway.marvel.com:443/v1/public/";

import { Character, Comic, Creator, Event, Series, Story } from "../types"; // Assuming you have the types exported in a file

const LIMIT=8;

/**
 * Fetch a paginated list of characters.
 * @param limit Number of characters per page.
 * @param offset Starting point of the records.
 * @returns Promise of Character array.
 */
export const getCharacters = async (limit=8,offset=0): Promise<Character[]> => {
  try {

    const response = await axios.get(`${baseURL}characters`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset
      },
    });
    return response.data.data.results as Character[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getLatestCharacters = async (limit=8,offset=0): Promise<Character[]> => {
  try {

    const response = await axios.get(`${baseURL}characters?orderBy=-modified`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset
      },
    });
    return response.data.data.results as Character[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getCharactersInfinite = async (pageParams:number): Promise<{characters:Character[],currrentPage:number,nextPage:number|null}> => {

  try {

    const response = await axios.get(`${baseURL}characters`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit:LIMIT,
        offset:pageParams===0 ? 0 :pageParams*LIMIT
      },
    });
    return {
      characters:response.data.data.results as Character[],
      currrentPage:pageParams,
      nextPage:pageParams+1
      
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a single character by ID.
 * @param characterId ID of the character.
 * @returns Promise of Character.
 */
export const getCharacterById = async (
  characterId: string
): Promise<Character> => {
  try {
    const response = await axios.get(`${baseURL}characters/${characterId}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0] as Character;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a paginated list of comics.
 * @param limit Number of comics per page.
 * @param offset Starting point of the records.
 * @returns Promise of Comic array.
 */
export const getLatestComics = async (
  limit = 8,
  offset = 0
): Promise<Comic[]> => {
  try {
    const response = await axios.get(`${baseURL}comics?orderBy=-onsaleDate`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data.results as Comic[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getComicsInfinite = async (pageParams:number): Promise<{comics:Comic[],currrentPage:number,nextPage:number|null}> => {
  try {

    const response = await axios.get(`${baseURL}comics`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit:LIMIT,
        offset:pageParams===0 ? 0 :pageParams*LIMIT
      },
    });
    return {
      comics:response.data.data.results as Comic[],
      currrentPage:pageParams,
      nextPage:pageParams+1
      
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a single comic by ID.
 * @param comicId ID of the comic.
 * @returns Promise of Comic.
 */
export const getComicById = async (comicId: string): Promise<Comic> => {
  try {
    const response = await axios.get(`${baseURL}comics/${comicId}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0] as Comic;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a paginated list of creators.
 * @param limit Number of creators per page.
 * @param offset Starting point of the records.
 * @returns Promise of Creator array.
 */
export const getCreators = async (
  limit = 8,
  offset = 0
): Promise<Creator[]> => {
  try {
    const response = await axios.get(`${baseURL}creators`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data.results as Creator[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getCreatorsInfinite = async (pageParams:number): Promise<{creators:Creator[],currrentPage:number,nextPage:number|null}> => {
  try {

    const response = await axios.get(`${baseURL}creators`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit:LIMIT,
        offset:pageParams===0 ? 0 :pageParams*LIMIT
      },
    });
    return {
      creators:response.data.data.results as Creator[],
      currrentPage:pageParams,
      nextPage:pageParams+1
      
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a single creator by ID.
 * @param creatorId ID of the creator.
 * @returns Promise of Creator.
 */
export const getCreatorById = async (creatorId: string): Promise<Creator> => {
  try {
    const response = await axios.get(`${baseURL}creators/${creatorId}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0] as Creator;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a paginated list of events.
 * @param limit Number of events per page.
 * @param offset Starting point of the records.
 * @returns Promise of Event array.
 */
export const getEvents = async (
  limit = 8,
  offset = 0
): Promise<Event[]> => {
  try {
    const response = await axios.get(`${baseURL}events`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data.results as Event[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEventsInfinite = async (pageParams:number): Promise<{events:Event[],currrentPage:number,nextPage:number|null}> => {
  try {

    const response = await axios.get(`${baseURL}events`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit:LIMIT,
        offset:pageParams===0 ? 0 :pageParams*LIMIT
      },
    });
    return {
      events:response.data.data.results as Event[],
      currrentPage:pageParams,
      nextPage:pageParams+1
      
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a single event by ID.
 * @param eventId ID of the event.
 * @returns Promise of Event.
 */
export const getEventById = async (eventId: string): Promise<Event> => {
  try {
    const response = await axios.get(`${baseURL}events/${eventId}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0] as Event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a paginated list of series.
 * @param limit Number of series per page.
 * @param offset Starting point of the records.
 * @returns Promise of Series array.
 */
export const getSeries = async (
  limit = 8,
  offset = 0
): Promise<Series[]> => {
  try {
    const response = await axios.get(`${baseURL}series`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data.results as Series[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLatestSeries = async (
  limit = 8,
  offset = 0
): Promise<Series[]> => {
  try {
    const response = await axios.get(`${baseURL}series?orderBy=-modified`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data.results as Series[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getSeriesInfinite = async (pageParams:number): Promise<{series:Series[],currrentPage:number,nextPage:number|null}> => {
  try {

    const response = await axios.get(`${baseURL}series`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit:LIMIT,
        offset:pageParams===0 ? 0 :pageParams*LIMIT
      },
    });
    return {
      series:response.data.data.results as Series[],
      currrentPage:pageParams,
      nextPage:pageParams+1
      
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a single series by ID.
 * @param seriesId ID of the series.
 * @returns Promise of Series.
 */
export const getSeriesById = async (seriesId: string): Promise<Series> => {
  try {
    const response = await axios.get(`${baseURL}series/${seriesId}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0] as Series;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch a paginated list of stories.
 * @param limit Number of stories per page.
 * @param offset Starting point of the records.
 * @returns Promise of Story array.
 */
export const getStories = async (
  limit = 8,
  offset = 0
): Promise<Story[]> => {
  try {
    const response = await axios.get(`${baseURL}stories`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data.results as Story[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStoriesInfinite = async (pageParams:number): Promise<{stories:Story[],currrentPage:number,nextPage:number|null}> => {
  try {

    const response = await axios.get(`${baseURL}stories`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit:LIMIT,
        offset:pageParams===0 ? 0 :pageParams*LIMIT
      },
    });
    return {
      stories:response.data.data.results as Story[],
      currrentPage:pageParams,
      nextPage:pageParams+1
      
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/**
 * Fetch a single story by ID.
 * @param storyId ID of the story.
 * @returns Promise of Story.
 */
export const getStoryById = async (storyId: string): Promise<Story> => {
  try {
    const response = await axios.get(`${baseURL}stories/${storyId}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0] as Story;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
