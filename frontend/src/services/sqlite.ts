import axios from 'axios';

const API_BASE_URL = (import.meta as any).env.VITE_BACKEND_URL;

export interface WorkorderItem {
  item_name: string; // The name of the item
  in_basket: number; // The quantity already in the basket
  required: number;  // The required quantity
}

export interface Workorder {
  order_number: number;     // Work order number
  status: string;           // Status of the work order
  items: WorkorderItem[];   // List of item details
}

export async function getWorkorders(): Promise<Workorder[]> {
  const response = await axios.get(`${API_BASE_URL}/get_orders`);
  // console.log("Res: ", response.data)
  if(response.status !== 200) throw new Error()
  const data = response.data?.map((order: any) => ({
    WorkorderNumber: order.order_number,
      assignee: order?.assigned ?? 'Alireza',
      status: order?.status,
      Items: order.items.map((item: any) => ({
      name: item.item_name.toLowerCase(),
      Found: item.in_basket ?? 0,
      Required: item.required ?? 0,
    })),
  }));
  return data;
}

export async function createWorkorder(workorder: any): Promise<any> {
  return await axios.post(`${API_BASE_URL}/create_order`, workorder);
}

export async function deleteWorkorder(orderNumber: any): Promise<any> {
  return await axios.delete(`${API_BASE_URL}/workorder/${orderNumber}`);
}
