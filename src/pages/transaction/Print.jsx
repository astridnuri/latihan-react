import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import api from "../../services/api.js";

const PrintTransaction = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");
  const status = searchParams.get("transaction_status");

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchTransaction = async() => {
      if (!orderId) {
        setLoading(false)
        return
      }
      try {
        const res = await api.get(`/transaction/${orderId}`)
        setOrder(res.data) //dot data ini adalah ngambil keluaran be yg di paling bawah ada di postman itu
      } catch (error) {
        console.log("Fail fetch data transaction", error.message)
      } finally { //dikasi finally supaya gk muter2 endingnya
        setLoading(false)
      }
    }
    fetchTransaction()
  },[])

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="max-w-md mx-auto my-6 space-y-4">
        <div className="flex items-center justify-between print:hidden">
          <Button variant="outline" onClick={() => navigate("/transaction")}>
            Back
          </Button>
          <Button onClick={handlePrint} size="sm" className="bg-primary">
            Print Receipt
          </Button>
        </div>
      </div>
      <Card className="border border-border/80 shadow-none font-mono text-xs p-6 bg-white text-black print:border-none">
        <CardHeader className="text-center p-0 pb-4 border-b border-dashed border-zinc-400">
          <CardTitle className="text-base font-bold uppercase tracking-wider">POS PPKD Jakarta Pusat</CardTitle>
          <p className="text-[11px] text-zinc-600">Jl. Karet Baru</p>
          <p className="text-[11px] text-zinc-500 mt-1">{new Date().toLocaleDateString("id-ID")}</p>
        </CardHeader>
        <CardContent className="p-0 pt-3 space-y-3">
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span>Order Number</span>
              <span className="uppercase">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Payment Method</span>
              <span className="uppercase">{order.payment_method===1 ? "QRIS" : "Cash"}</span>
            </div>
          </div>
          <div className="border-t border-dashed border-zinc-400 pt-2 space-y-2">
            {order?.items?.length > 0 ? (
              order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-zinc-600">
                      {item.qty}x{item.price.toLocaleString("id-ID")}
                    </div>
                  </div>
                  <div className="font-medium">Rp {(item.qty * item.price).toLocaleString("id-ID")}</div>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center">
                <span>Total Payment</span>
                <span>Rp 100.000</span>
              </div>
            )}
            <div className="border-t border-dashed border-zinc-400 pt-2 space-y-1">
              {order?.subtotal && (
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
                </div>
              )}
              {order?.tax && (
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>Rp {order.tax.toLocaleString("id-ID")}</span>
                </div>
              )}
              {order?.total && (
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-dashed border-zinc-400 pt-4 text-center space-y-1">
            <p className="text-semibold">Thank You</p>
            <p className="text-[10px] text-zinc-500">Please come again</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PrintTransaction;
