import Icon from '@mdi/react';
import { mdiRegisteredTrademark } from '@mdi/js';

<Icon path={mdiRegisteredTrademark} size={1} />

function Footer() {
    return (
        <div className="footer">
            <Icon path={mdiRegisteredTrademark} size={1} />
            <p>VitekVo</p>
        </div>
    )
}

export default Footer;
