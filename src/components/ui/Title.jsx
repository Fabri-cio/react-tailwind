const Title = ({ title = "", style = "" }) => {
  return <h1 className={`${style}`}>{title}</h1>;
};

export default Title;
