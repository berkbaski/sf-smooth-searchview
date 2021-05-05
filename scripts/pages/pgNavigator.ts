import PgNavigatorDesign from 'generated/pages/pgNavigator';

export default class PgNavigator extends PgNavigatorDesign {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnStandardPage.onPress = () => {
            this.router.push('/pages/pgStandardList');
        };
        this.btnZebraPage.onPress = () => {
            this.router.push('/pages/pgZebraList');
        };
    }
    setTitle() {
        this.headerBar.title = 'Select your page';
        this.btnStandardPage.text = 'Open Standard ListView Page';
        this.btnZebraPage.text = 'Open Zebra ListView Page';
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.setTitle();
}
