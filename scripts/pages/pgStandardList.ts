import PgStandardListDesign from 'generated/pages/pgStandardList';
import LviElement from 'components/LviElement';

import Color from 'sf-core/ui/color';
import FlexLayout from 'sf-core/ui/flexlayout';
import SearchView from 'sf-core/ui/searchview';
import Application from 'sf-core/application';
import System from 'sf-core/device/system';

import * as elementService from 'services/element'
import { ElementType } from 'services/types/elements';
import { ContentOffsetType, OnScrollType } from 'lib/types/SearchViewTypes';

export default class PgStandardList extends PgStandardListDesign {
    elements: ElementType[] = [];
    scrollParams = {
        maxSearchHeight: 50,
        innerMaxSearchFlexHeight: 40,
        innerMaxSearchFlexBorderRadius: 10
    };

    // Elements for SearchView
    searchFlex: FlexLayout;
    innerSearchFlex: FlexLayout;
    searchBar: SearchView;

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    setTitle() {
        this.headerBar.title = 'Standard ListView';
    }
    initSearchView() {
        this.lvElements.contentInset = { top: this.scrollParams.maxSearchHeight, bottom: 0 };

        this.searchFlex = new FlexLayout();
        this.searchFlex.positionType = FlexLayout.PositionType.ABSOLUTE;
        this.searchFlex.backgroundColor = Color.create('#00a1f1');
        this.searchFlex.top = 0;
        this.searchFlex.left = 0;
        this.searchFlex.right = 0;
        this.searchFlex.height = 0;
        this.searchFlex.alpha = 0;

        this.innerSearchFlex = new FlexLayout();
        this.innerSearchFlex.backgroundColor = Color.TRANSPARENT;
        this.innerSearchFlex.borderRadius = 15;
        this.innerSearchFlex.height = 0;
        this.innerSearchFlex.marginTop = 5;
        this.innerSearchFlex.marginLeft = 20;
        this.innerSearchFlex.marginRight = 20;
        this.searchFlex.addChild(this.innerSearchFlex);

        this.searchBar = new SearchView();
        this.searchBar.positionType = FlexLayout.PositionType.ABSOLUTE;
        this.searchBar.left = 0;
        this.searchBar.right = 0;
        this.searchBar.bottom = -20;
        this.searchBar.top = -20;
        this.searchBar.hint = "Search";

        if (System.OS === System.OSType.IOS) {
            this.searchBar.ios.showsCancelButton = true;
            this.searchBar.ios.cancelButtonText = 'Cancel';
            this.searchBar.ios.cancelButtonColor = Color.WHITE;
            this.searchBar.ios.cursorColor = Color.BLACK;
            this.searchBar.ios.searchViewStyle = SearchView.iOS.Style.PROMINENT;
            this.searchBar.ios.onCancelButtonClicked = () => {
                this.searchBar.text = '';
                this.searchBar.hideKeyboard();
            }
        }

        this.searchBar.backgroundColor = Color.create('#00a1f1');
        this.searchBar.textFieldBackgroundColor = Color.create('#f5f5f5');
        this.innerSearchFlex.addChild(this.searchBar);

        this.layout.addChild(this.searchFlex);
        this.lvElements.onScroll = (params: OnScrollType) => this.onScroll(params);
        // @ts-ignore
        this.lvElements.ios.onScrollEndDecelerating = (contentOffset: ContentOffsetType) => this.onScrollEndDecelerating(contentOffset);
        // @ts-ignore
        this.lvElements.ios.onScrollEndDraggingWillDecelerate = (contentOffset: ContentOffsetType, decelerate: boolean) => this.onScrollEndDraggingWillDecelerate(contentOffset, decelerate);
    }
    stopScroll(contentOffset: ContentOffsetType) {
        if (contentOffset.y > 0 && contentOffset.y < this.scrollParams.maxSearchHeight) {
            const contentOffsetY = ((contentOffset.y / this.scrollParams.maxSearchHeight) <= 0.5) ? -this.scrollParams.maxSearchHeight : 0;
            this.lvElements.nativeObject.setContentOffsetAnimated({ x: 0, y: contentOffsetY }, true);
        }
    }
    onScrollEndDecelerating(contentOffset: ContentOffsetType) {
        this.stopScroll(contentOffset);
    }
    onScrollEndDraggingWillDecelerate(contentOffset: ContentOffsetType, decelerate: boolean) {
        if (!decelerate) {
            this.stopScroll(contentOffset);
        }
    }
    onScroll(params: OnScrollType) {
        if (params.contentOffset.y >= 0 && params.contentOffset.y < this.scrollParams.maxSearchHeight) {
            this.searchFlex.height = this.scrollParams.maxSearchHeight - params.contentOffset.y;
            this.innerSearchFlex.height = this.scrollParams.innerMaxSearchFlexHeight - params.contentOffset.y;
            this.innerSearchFlex.borderRadius = this.innerSearchFlex.height * this.scrollParams.innerMaxSearchFlexBorderRadius / this.scrollParams.innerMaxSearchFlexHeight;
            this.searchFlex.alpha = 1;
            this.searchFlex.applyLayout();
        } else if (params.contentOffset.y < 0) {
            if (this.searchFlex.height != this.scrollParams.maxSearchHeight) {
                this.searchFlex.height = this.scrollParams.maxSearchHeight;
                this.innerSearchFlex.height = this.scrollParams.innerMaxSearchFlexHeight;
                this.innerSearchFlex.borderRadius = this.scrollParams.innerMaxSearchFlexBorderRadius;
                this.searchFlex.alpha = 1;
                this.searchFlex.applyLayout();
            }
        } else {
            if (this.searchFlex.height != 0) {
                this.searchFlex.height = 0;
                this.innerSearchFlex.height = 0;
                this.searchFlex.alpha = 0;
                this.searchFlex.applyLayout();
            }
        }
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
    this.initSearchView();
    this.fetchData();
}
