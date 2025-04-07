import clsx from 'clsx';

function TitlePage( { title, className, }: {
  title: string,
  className?: string
} ) {
  return (
    <h1
      className={ clsx(
        'text-xl font-bold text-primary',
        className
      ) }
    >
      { title }
    </h1>
  );
}

export default TitlePage;