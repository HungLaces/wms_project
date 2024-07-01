const generator = (value) => {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

console.log(generator("Đây là tiêu đề"));
