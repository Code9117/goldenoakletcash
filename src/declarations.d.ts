// 声明图片文件类型
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.JPG' {
  const value: string;
  export default value;
}