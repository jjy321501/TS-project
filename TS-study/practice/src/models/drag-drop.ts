//Drag & Drop 인터페이스
export interface Draggable {
  dragStartHandler(e: DragEvent): void; // 드래그 시작 시
  dragEndHandler(e: DragEvent): void; // 드래그 버튼을 놓을 시
}

export interface DragTarget {
  dragOverHandler(e: DragEvent): void; // 대상 객체 위에 진입 시 (드롭을 할 수 있게)
  dropHandler(e: DragEvent): void; // 드래그 끝나서 객체를 놓는 장소에서 발생 (드롭 시 처리)
  dragLeaveHandler(e: DragEvent): void; // 드래그 끝나고 대상 객체에서 벗어날때 발생 (시각적인 피드백 등 드래그현황 체크)
}
