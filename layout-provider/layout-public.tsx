import Nav from '@/components/ui/nav';

const LayoutPublic = ( { children, } : { children : React.ReactNode } ) => {
  return (
    <div className="LayoutPublic p-5 h-screen flex flex-col">
      <Nav/>
      { children }
    </div>
  );
};

export default LayoutPublic;