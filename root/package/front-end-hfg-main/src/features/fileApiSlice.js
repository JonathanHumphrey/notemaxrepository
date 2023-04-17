import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const filesAdapter = createEntityAdapter({});
const initialState = filesAdapter.getInitialState();

export const fileApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getFiles: builder.query({
			query: () => ({
				url: "api/files",
				method: "GET",
				//responseType: "blob",
			}),
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			transformResponse: (responseData) => {
				const loadedFiles = responseData.map((file) => {
					file.id = file._id;
					return file;
				});
				return filesAdapter.setAll(initialState, loadedFiles);
			},
		}),
		uploadFile: builder.mutation({
			query: ({ formData }) => ({
				url: "/upload",
				method: "POST",
				body: formData,
			}),
		}),
		deleteFile: builder.mutation({
			query: ({ id }) => ({
				url: "api/files",
				method: "DELETE",
				body: { id },
			}),
		}),
		updateLikes: builder.mutation({
			query(data) {
				console.log(data);
				return {
					url: `api/files/like/${data.fileId}/${data.userId}`,
					method: "PUT",
					body: { userId: data.user },
				};
			},
		}),
		updateDislikes: builder.mutation({
			query(data) {
				console.log(data);
				return {
					url: `api/files/dislike/${data.fileId}/${data.userId}`,
					method: "PUT",
					body: { userId: data.user },
				};
			},
		}),
	}),
});

export const {
	useUploadFileMutation,
	useGetFilesQuery,
	useUpdateLikesMutation,
	useUpdateDislikesMutation,
} = fileApiSlice;

export const selectFileResult = fileApiSlice.endpoints.getFiles.select();

const selectFilesData = createSelector(
	selectFileResult,
	(fileResult) => fileResult.data
);

export const {
	selectAll: selectAllFiles,
	selectById: selectFileById,
	selectIds: selectFileIds,
} = filesAdapter.getSelectors(
	(state) => selectFilesData(state) ?? initialState
);
