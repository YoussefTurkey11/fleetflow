const Title = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold capitalize">{title}</h1>
      <p className="text-sm text-muted-foreground">{subTitle}</p>
    </div>
  );
};

export default Title;
