import Swal from 'sweetalert'

const Alert = ({title, text, icon}) => {
    Swal({
        title,
        text,
        icon
    })
};

export default Alert