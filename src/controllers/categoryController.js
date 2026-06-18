import CategoryModel from "../models/categoryModel";


class Category {

    constructor() {}

    async getAllC() {

        return(await CategoryModel.getAllCategory())
        
    }
}