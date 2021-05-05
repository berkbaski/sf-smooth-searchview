import PgZebraListDesign from 'generated/pages/pgZebraList';

import pushClassNames from "@smartface/contx/lib/styling/action/pushClassNames";
import removeClassName from "@smartface/contx/lib/styling/action/removeClassName";

import LviElement from 'components/LviElement';

import * as elementService from 'services/element'
import { ElementType } from 'services/types/elements';

export default class PgZebraList extends PgZebraListDesign {
    elements: ElementType[] = [];
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    setTitle() {
        this.headerBar.title = 'Zebra ListView';
    }
    fetchData() {
        this.elements = elementService.getAll();
        this.refreshListView();
    }
    initListView() {
        this.lvElements.rowHeight = LviElement.getHeight();
        this.lvElements.onRowBind = (listViewItem: LviElement, index: number) => {
            listViewItem.keyText = this.elements[index].key;
            listViewItem.valueText = this.elements[index].value;

            listViewItem.flElementWrapper.dispatch(
                pushClassNames(index % 2 === 1 ? '.sf-flexLayout-wrapper-active' : '.sf-flexLayout-wrapper-inactive')
            );
        };
        this.lvElements.refreshEnabled = false;
    }
    refreshListView() {
        this.lvElements.itemCount = this.elements.length;
        this.lvElements.refreshData();
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
    this.initListView();
    this.fetchData();
}
