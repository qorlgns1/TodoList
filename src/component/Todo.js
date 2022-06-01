class Todo {
  constructor(content) {
    this.content = content;
    this.date = this.getNowDate();
    this.id = this.getUniqueId();
  }

  getNowDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
    const week = weekArr[now.getDay()];
    const hour = now.getHours();
    const minutes = now.getMinutes();

    return `${year}년 ${month}월 ${day}일(${week}) ${hour}:${minutes}`;
  }

  getUniqueId() {
    const alphabet = ["B", "A", "E", "K", "I", "H", "U", "N"];
    return (
      parseInt(Math.random() * 1000000000000000) +
      alphabet[Math.ceil((Math.random() * 10) % alphabet.length)]
    );
  }
}

export default Todo;
