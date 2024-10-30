export interface CategorieProps{
    id:number;
    naziv:string;
    opis:string;
};

export type CategorieContextType = {
    categList: CategorieProps[];
    setCategList: Function;
}