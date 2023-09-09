import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class Utils {


  static VerifyLogin() {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === '') {
      window.location.replace('/login')
    }
  }

  static Options() {
    return {
      title: 'Title',
      message: 'Message',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => { },
      afterClose: () => { },
      onClickOutside: () => { },
      onKeypress: () => { },
      onKeypressEscape: () => { },
      overlayClassName: "overlay-custom-class-name"
    };
  }

  static Submit = (ClickedYes, ClickedNo) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: ClickedYes
        },
        {
          label: 'No',
          onClick: ClickedNo
        }
      ]
    });
  };
}
export default Utils
