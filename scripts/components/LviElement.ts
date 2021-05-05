import LviElementDesign from 'generated/my-components/LviElement';

export default class LviElement extends LviElementDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    get keyText(): string {
        return this.lblKey.text;
    }

    set keyText(key: string) {
        this.lblKey.text = key;
    }

    get valueText(): string {
        return this.lblValue.text;
    }

    set valueText(value: string) {
        this.lblValue.text = value;
    }

    static getHeight(): number {
        return 54;
    }
}
