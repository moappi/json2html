interface componentMethods {
    add: (name:object|string, template:object) => void,
    get: (name:string) => object,
}
interface iHTMLInterface {
    append: (ihtml:iHTMLInterface) => iHTMLInterface;
    appendHTML: (html:string) => iHTMLInterface;
    toJSON: () => object;

}
export function render(json: object|string, template: object, options?: object): string;
export function toText(html:string): string;
export const component: componentMethods;
export const version: string;
export const iHTML: iHTMLInterface;