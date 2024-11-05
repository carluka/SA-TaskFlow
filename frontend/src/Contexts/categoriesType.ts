export interface CategoryProps{
    id:number;
    naziv:string;
    uporabnik: string;
};

export type CategoryContextType = {
    categList: CategoryProps[];
    setCategList: Function;
    addCat: Function;
}