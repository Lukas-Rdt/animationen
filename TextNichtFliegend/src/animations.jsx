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
}