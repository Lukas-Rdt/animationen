export const animations = {
    rightGraphicIn: {
        left: '50%',
        transition: { duration: 1.5, ease: 'easeInOut'},
      },

    leftTitleIn: {
        right: '50%',
        transition: { duration: 1.5, ease: 'easeInOut'},
    },

    leftTitleUp: {
        top: '20%',
        transition: { duration: 1.5, ease: 'easeInOut'},
    },

    textUp: {
        opacity: 1,
        y: '-200%',
        transition: { duration: 1.5, ease: 'easeInOut'},
    },
    
    rightGraphicOut: {
        left: '100%',
        transition: { duration: 1.5, ease: 'easeInOut'},     
    },
    
    leftTitleOut: {
        right: '100%',
        transition: { duration: 1.5, ease: 'easeInOut'},
    },

    leftTextOut: {
        right: '100%',
        transition: { duration: 1.5, ease: 'easeInOut'},
    },

    hiddenTitleReset: {
        top: '50%',
        transition: { duration: 0.1 },
    },

    setTextsHidden: {
        opacity: 0,
        transition: { duration: 0.1 },
    },

    hiddenTextReset: {
        right: '50%',
        y: 0,
        transition: { duration: 0.1, delay: 1 },
    },
}