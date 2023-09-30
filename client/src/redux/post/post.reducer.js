import { createSlice } from "@reduxjs/toolkit";
import post from ".";

const postReducer = createSlice({
  name: "post",
  initialState: {
    modal: {
      show: false,
    },
    isSuccess: false,
    isSendingData: false,
    isLoading: true,
    size: 4,
    getAllPost: {
      currentPage: null,
      currentPageData: null,
      totalData: null,
      totalPages: null,
      isLast: false,
      data: [],
    },

    deletePost: {
      isLoading: false
    }
  },
  reducers: {
    showModal: (state, { payload }) => {
      state.modal.show = payload;
    },
    showMore: (state) => {
      state.size += 4;
    },
  },
  extraReducers(builder) {
    builder.addCase(post.request.createPost.pending, (state) => {
      state.isSendingData = true;
      state.isSuccess = false;
    });
    builder.addCase(post.request.createPost.fulfilled, (state, { payload }) => {
      state.getAllPost.data.push(payload.data)
      state.isSendingData = false;
      state.isSuccess = true;
      state.modal.show = false;
    });
    builder.addCase(post.request.createPost.rejected, (state) => {
      state.isSuccess = false;
      state.isSendingData = false;
    });



    builder
      .addCase(post.request.getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(post.request.getAllPost.fulfilled, (state, { payload }) => {
        if (payload.isEmpty) return
        const {
          data,
          currentPage,
          currentPageData,
          isLast,
          totalData,
          totalPages,
        } = payload;
        state.getAllPost.currentPage = currentPage;
        state.getAllPost.currentPageData = currentPageData;
        state.getAllPost.isLast = isLast;
        state.getAllPost.totalData = totalData;
        state.getAllPost.totalPages = totalPages;
        state.getAllPost.data = data
        state.isLoading = false;
      })
      .addCase(post.request.getAllPost.rejected, (state) => {
        state.isLoading = false;
      });

    builder.addCase(post.request.deletePost.pending, (state) => {
      state.deletePost.isLoading = true
    })
      .addCase(post.request.deletePost.fulfilled, (state, { payload: { data: { id } } }) => {
        const deletedPost = state.getAllPost.data.filter(i => {
          return i.id !== id
        })
        state.getAllPost.data = deletedPost
        state.deletePost.isLoading = false
      })
      .addCase(post.request.deletePost.rejected, (state) => {
        state.deletePost.isLoading = false
      })

  },


});

export default postReducer;
