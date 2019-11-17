( () => {
  document.addEventListener('DOMContentLoaded', () => {

    var config = {
      apiKey:            "****************************",
      authDomain:        "*********************.com",
      databaseURL:       "*************************.com",
      projectId:         "portfolio-ivan",
      storageBucket:     "portfolio-ivan.appspot.com",
      messagingSenderId: "********************"
    };
    firebase.initializeApp(config);

    const firestore = firebase.firestore();
    const settings  = {/* your settings... */ timestampsInSnapshots: true };
    firestore.settings(settings);
    const userMessages = firestore.doc("messages/message" + '' + ( new Date() ));

    const pages           = document.getElementsByClassName('pages');
    const buttons         = document.getElementsByClassName('menuButton');
    const image           = document.getElementsByClassName('image')[ 0 ];
    const background      = document.getElementsByClassName('background')[ 0 ];
    const userName        = document.getElementsByClassName('userName')[ 0 ].childNodes;
    const formButton      = document.getElementsByClassName('submitButton')[ 0 ];
    const formContainer   = document.getElementsByClassName('formContainer')[ 0 ];
    const afterMessage    = document.getElementsByClassName('afterMessageBox')[ 0 ];
    const nameField       = document.getElementsByClassName('contactName')[ 0 ];
    const emailField      = document.getElementsByClassName('contactEmail')[ 0 ];
    const messageField    = document.getElementsByClassName('contactMessage')[ 0 ];
    let postTime;
    let header            = document.getElementsByTagName('header')[ 0 ];
    let imageWidth        = 87;
    let maxscrollDistance = 110;
    let widthAtscroll     = 35;
    let widthDifference   = imageWidth - widthAtscroll;
    let pixelsPerScroll   = ( widthDifference / maxscrollDistance );
    let widthSmall;


    pages[ 0 ].style.display     = 'block';
    buttons[ 0 ].style.boxShadow = '0 9px 12px #00000014';
    pages[ 1 ].style.display     = 'none';
    if (window.innerWidth < 630) {
      userName[ 1 ].style.color  = '#fff';
      userName[ 3 ].style.color  = '#fff';
      userName[ 7 ].style.color  = '#fff';
      background.backgroundImage = 'url("Background mobile.svg")';
      background.style.opacity   = '1';
    }
    widthSmall = window.innerWidth < 630;

    window.addEventListener('resize', CheckHeader);
    window.addEventListener('scroll', CheckHeader);
    window.addEventListener('scroll', imageResize);


    function CheckHeader() {


      if (window.innerWidth < 630 && widthSmall === false) {
        widthSmall = true;
        userName[ 1 ].style.color  = '#fff';
        userName[ 3 ].style.color  = '#fff';
        userName[ 7 ].style.color  = '#fff';
        background.backgroundImage = 'url("Background mobile.svg")';
        background.style.opacity   = '1';

      } else if (window.innerWidth > 630 && widthSmall === true) {
        widthSmall = false;
        userName[ 1 ].style.color  = '#4b4b4b';
        userName[ 3 ].style.color  = '#4b4b4b';
        userName[ 7 ].style.color  = '#4b4b4b';
        background.backgroundImage = 'url("Background Desktop.svg")';
        if (pageYOffset < 20) {
          background.style.opacity = '0';
        }
      }
      if (window.innerWidth > 630 && pageYOffset < 20 ) {
          background.style.opacity = '0';
      }
      if (pageYOffset > 110 ) {
        background.style.opacity = '1';
      }
    }


    for (let i = 0; i < buttons.length; i++) {
      buttons[ i ].addEventListener('click', function () {
        switch (buttons[ i ].className) {

          case 'menuItem1 menuButton':
            pages[ 0 ].style.display     = 'block';
            pages[ 1 ].style.display     = 'none';
            buttons[ 0 ].style.boxShadow = '0 9px 12px #00000014';
            buttons[ 1 ].style.boxShadow = '0 9px 12px #00000000';

            break;
          case 'menuItem2 menuButton':
            pages[ 0 ].style.display     = 'none';
            pages[ 1 ].style.display     = 'block';
            buttons[ 0 ].style.boxShadow = '0 9px 12px #00000000';
            buttons[ 1 ].style.boxShadow = '0 9px 12px #00000014';

            break;
          case 'menuItem3 menuButton':

            buttons[ 2 ].style.boxShadow = '0 9px 12px #00000000';

            break;
        }
      });

      for (let i = 0; i < buttons.length; i++) {
        buttons[ 2 ].addEventListener('mouseout', function () {

          buttons[ 2 ].style.boxShadow = '0 9px 12px #00000000';
        });
        buttons[ i ].addEventListener('mouseover', function () {
            buttons[ i ].style.boxShadow = '0 9px 12px #00000014';
          },

          buttons[ i ].addEventListener('mouseout', function () {
              if (pages[ i ] !== undefined) if (pages[ i ].style.display === 'none') {
                buttons[ i ].style.boxShadow = '0 9px 12px #00000000';
              }
            }
          )
        )
      }
    }


    window.addEventListener('scroll', imageResize);

    function imageResize() {

      if (pageYOffset > 0 && pageYOffset < 110) {
        let scrolltoppos      = Math.min(pageYOffset, maxscrollDistance);
        let scrollCahngepx    = Math.floor(scrolltoppos * pixelsPerScroll);
        let zoomedWidth       = imageWidth - scrollCahngepx;
        image.style.width     = zoomedWidth + 'px';
        image.style.height    = zoomedWidth + 'px';
        image.style.transform = 'translate(0' + ',' + ( ( scrollCahngepx * 1.9 ) ) + 'px)';
        header.style.top      = ( -scrollCahngepx * 2.1 ) + 'px';
        if (window.innerWidth > 630) {
          background.style.opacity = ( scrollCahngepx * 0.02 ) + '';
        }
        for (let i = 0; i < buttons.length; i++) {
          buttons[ i ].style.transform = 'translate(' + ( scrollCahngepx * 0.6 ) + 'px)';
        }
      }


      if (pageYOffset === 0) {
        image.style.width     = '87px';
        image.style.height    = '87px';
        image.style.transform = 'translate(0,0)';
        header.style.top      = '0';


        for (let i = 0; i < buttons.length; i++) {
          buttons[ i ].style.transform = 'translate(0px)';
        }
      }

      if (pageYOffset > 110) {
        image.style.width        = '35px';
        image.style.height       = '35px';
        image.style.transform    = 'translate(0,100px)';
        header.style.top         = '-110px';


        for (let i = 0; i < buttons.length; i++) {
          buttons[ i ].style.transform = 'translate(30px)';
        }
      }

    }

    formButton.addEventListener('click', function sendMessage(event) {
        let emailFieldCheck = emailField.value.toString().split('');
        let proceedMail     = false;
        for (i = 0; i < emailFieldCheck.length; i++) {
          if (emailFieldCheck[ i ] === '@') {
            proceedMail = true;
            event.preventDefault();
            if (nameField.value && proceedMail === true && messageField.value) {
              const messageName             = nameField.value;
              const messageEmail            = emailField.value;
              const messageText             = messageField.value;
              postTime                      = new Date();
              formButton.style.opacity      = '0';
              formContainer.style.boxShadow = '0px 9px 12px #00000014';
              formContainer.style.transform = 'translate(' + window.innerWidth + 'px' + ',0)';
              userMessages.set({
                name:    messageName,
                Email:   messageEmail,
                Message: messageText
              });

              window.setTimeout(function RemoveForm() {
                formContainer.style.display = 'none';
                formButton.style.display    = 'none';
                afterMessage.style.display  = 'block';
                afterMessage.style.opacity  = '1';
              }, 1000);
            }
          } else {
            proceedMail = false;
          }
        }


      }
    );
  });

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
} )();
