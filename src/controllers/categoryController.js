import categoryModel from "../models/CategoryModel.js";
import apiResponse from "../views/ApiResponse.js";

// LIST
async function list(req, res, next) {
    try {
        const categories = await categoryModel.findAllCategory();

        return apiResponse.success(res, categories);

    } catch (error) {
        next(error);
    }
}

// GET BY ID
async function getById(req, res, next) {
    try {
        const category = await categoryModel.findCategoryById(req.params.id);

        if (!category) {
            return apiResponse.notFound(res);
        }

        return apiResponse.success(res, category);

    } catch (error) {
        next(error);
    }
}

// CREATE
async function create(req, res, next) {
    try {
        const { name, description } = req.body;

        if (!name?.trim() || !description?.trim()) {
            return apiResponse.validationError(
                res,
                ['Name and description are required']
            );
        }

        const created = await categoryModel.createCategory({
            name,
            description
        });

        return apiResponse.created(
            res,
            created,
            'Category created successfully'
        );

    } catch (error) {
        next(error);
    }
}

// UPDATE
async function update(req, res, next) {
    try {
        const updated = await categoryModel.updateCategory(
            req.params.id,
            req.body
        );

        if (!updated) {
            return apiResponse.notFound(res);
        }

        return apiResponse.success(
            res,
            updated,
            'Category updated successfully'
        );

    } catch (error) {
        next(error);
    }
}

// DELETE
async function remove(req, res, next) {
    try {
        const removed = await categoryModel.removeCategory(req.params.id);

        if (!removed) {
            return apiResponse.notFound(res);
        }

        return apiResponse.removed(
            res,
            'Category deleted successfully'
        );

    } catch (error) {
        next(error);
    }
}

export default {
    list,
    getById,
    create,
    update,
    remove
};