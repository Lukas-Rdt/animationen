export const animations = {
    left50: {
        left: '50%',
    },

    right50: {
        right: '50%',
    },

    bottom50: {
        bottom: '50%',
    },

    top50: {
        top: '50%',
    },

    left100: {
        left: '100%',
    },

    right100: {
        right: '100%',
    },

    bottom100: {
        bottom: '100%',
    },

    top100: {
        bottom: 'auto',
        top: '100%',
    },

    move: (direction, value) => {
        let directionStyle = {};
        directionStyle[direction] = value;
        return directionStyle;
    },

    unset: (direction) => {
        let unsetStyle = {};
        unsetStyle[direction] = 'unset';
        return unsetStyle;
    },

    translateMinus50: {
        transform: 'translateY(-50%)',
    },

    translate50: {
        transform: 'translateY(50%)',
    },

    translate0: {
        transform: 'translateY(0)',
    },

    hide: {
        opacity: 0,
    },

    show: {
        opacity: 1,
    },

    color: (hexValue) => ({
        color: hexValue,
    }),


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
/*
Fade out same pos 
color change
single one out
y pos up
*/