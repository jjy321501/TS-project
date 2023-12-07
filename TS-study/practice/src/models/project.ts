// type 값을 리터럴타입 대신 enum 을 이용한다
export enum ProjectStatus {
  Active,
  Finished,
}
// 프로젝트(배열)의 형식
export class Project {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
