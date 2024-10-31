export interface CategorieProps{
    id:number;
    naziv:string;
    uporabnik: string;
};

export type CategorieContextType = {
    categList: CategorieProps[];
    setCategList: Function;
    addCat: Function;
}