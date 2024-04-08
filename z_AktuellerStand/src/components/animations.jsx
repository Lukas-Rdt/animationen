export const animations = {
    rightGraphicIn: {
        left: '50%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    leftTitleIn: {
        right: '50%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    leftTitleUp: {
        top: '20%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    resetTitleMid: {
        top: '50%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },
    
    hiddenTitleReset: {
        top: '50%',
        transition: { duration: 0.1 },
    },

    hiddenTitleSetUp: {
        top: '20%',
        transition: { duration: 0.1 },
    },

    textOp: {
        opacity: 1,
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    resetTextOp: {
        opacity: 0,
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    setTextsHidden: {
        opacity: 0,
        transition: { duration: 0.1 },
    },

    hiddenTextOp: {
        opacity: 1,
        transition: { duration: 0.1 },
    },

    rightGraphicOut: {
        left: '100%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    leftTitleOut: {
        right: '100%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    leftTextOut: {
        right: '100%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    leftTextIn: {
        right: '50%',
        transition: { duration: 1.5, ease: 'easeInOut' },
    },

    hiddenTextReset: (yValue) => ({
        //right: '50%',
        top: yValue,
        transition: { duration: 0.1 },
    }),

    hiddenTextResetDelay: (yValue) => ({
        right: '50%',
        top: yValue,
        transition: { duration: 0.1, delay: 1 },
    }),

    hideExplanation: {
        opacity: 0,
        transition: { duration: 1, ease: 'easeInOut' },
    },
    showExplanation: {
        opacity: 1,
        transition: { duration: 1, ease: 'easeInOut', delay: 1 },
    },

    resetTranslate50: {
        transform: "translateY(50%)",
        transition: { duration: 1.5, ease: 'easeInOut' }
    },
    bottom50: {
        bottom: '50%',
        transition: { duration: 1.5, ease: 'easeInOut' }
    },
    top50: {
        top: '50%',
        transition: { duration: 1.5, ease: 'easeInOut' }
    }
}
/*
Fade out same pos 
color change
single one out
y pos up
*/