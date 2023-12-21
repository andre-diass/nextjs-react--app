export default interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  userId: string;
  imageLinks: Array<string>;
}
