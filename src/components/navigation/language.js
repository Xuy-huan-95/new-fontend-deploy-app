import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav.scss'
import { useTranslation, Trans } from 'react-i18next';


const Language = () => {
    const { t, i18n } = useTranslation();

    const Changelanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <div>
            <NavDropdown title={i18n.language === "vi" ? "Việt nam" : "English"} id="basic-nav-dropdown" className='language' >
                <NavDropdown.Item onClick={() => Changelanguage('vi')}>Việt nam</NavDropdown.Item>
                <NavDropdown.Item onClick={() => Changelanguage('en')}>English</NavDropdown.Item>

            </NavDropdown>
        </div >
    )
}

export default Language;