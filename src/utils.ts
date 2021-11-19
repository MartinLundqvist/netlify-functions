import { nanoid } from 'nanoid';

interface IWork {
  id: number;
  work: string;
  worklong: string;
  from: string;
  to: string;
  descriptions: string[];
}

interface IProject {
  _id: string;
  imageUrl: string;
  projectUrl: string;
  projectTitle: string;
  projectSubTitle: string;
  projectDescription: string;
  projectTools: string[];
  projectGitUrl: string;
}

const stringToArray = (input: string): string[] => {
  const output = input.split(`\"`).filter((item) => item.length > 2);

  return output;
};

export const parseWorks = (data: any[]): IWork[] => {
  let results: IWork[] = [];
  try {
    data.forEach((line) => {
      results.push({
        id: line[0],
        work: line[1],
        worklong: line[2],
        from: line[3],
        to: line[4],
        descriptions: stringToArray(line[5]),
      });
    });
    // console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    throw new Error('Error parsing response data server side');
  }
};

export const parseProjects = (data: any[]): IProject[] => {
  let results: IProject[] = [];
  try {
    data.forEach((line) => {
      results.push({
        _id: nanoid(),
        projectTitle: line[0],
        projectSubTitle: line[1],
        projectDescription: line[2],
        projectTools: stringToArray(line[3]),
        projectGitUrl: line[4],
        projectUrl: line[5],
        imageUrl: line[6],
      });
    });
    // console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    throw new Error('Error parsing response data server side');
  }
};
