// https://numbrojs.com/getting-started.html

interface CardDashboardProps {
  title : string;
  value : number;
  isAmount : boolean;
  description : string;
}
import numbro from 'numbro';

function CardDashboard( { title, value, isAmount, description, } : CardDashboardProps ) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-bold">{ title }</h3>
      <p className="text-sm text-gray-500">{ description }</p>
      <p className="text-2xl font-bold text-gray-600">
        { isAmount ? numbro( value ).formatCurrency( { thousandSeparated: true, } ) : value }
      </p>
    </div>
  )
  ;
}

export default CardDashboard;
