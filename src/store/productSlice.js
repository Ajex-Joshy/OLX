import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsArray = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toMillis() : null, // convert to number
      };
    });
    return productsArray;
  }
);

export const markProductsAsSold = createAsyncThunk(
  "products/markProductsAsSold",
  async (ids, { rejectWithValue }) => {
    try {
      for (const id of ids) {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, { isSold: true });
      }
      return ids;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.data.push(action.payload);
    },
    deleteProduct(state, action) {
      state.products.data = state.products.data.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markProductsAsSold.fulfilled, (state, action) => {
        action.payload.forEach((id) => {
          const product = state.data.find((p) => p.id === id);
          if (product) {
            product.isSold = true;
          }
        });
      });
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export { markProductsAsSold };
export default productSlice.reducer;
