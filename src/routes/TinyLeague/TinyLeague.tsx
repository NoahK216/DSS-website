/* Noah Klein */

import NavBar from '../../common_components/NavBar';
import Footer from '../../common_components/Footer';
import TinyLeagueLanding from './TinyLeagueLanding';
import Ecosystem from './Ecosystem';
import RequestQuote from './RequestQuote';

const TinyLeague = () => {
    return (
        <div className="tinyLeague">
            <NavBar />
            <TinyLeagueLanding />
            <Ecosystem />
            <RequestQuote />
            <Footer />
        </div>
    );
};

export default TinyLeague;
