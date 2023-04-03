import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ setIsModalOpen, isModalOpen, customer }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <>
      <Modal
        title="Print Invoice"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <section ref={componentRef} className="py-20 bg-black">
          <div className="max-w-5xl mx-auto bg-white px-6">
            <article className="overflow-hidden">
              <div className="logo my-6">
                <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
              </div>
              <div className="bill-details">
                <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Invoice Detail:</p>
                    <p>{customer?.customerName}</p>
                    <p>Fake Street</p>
                    <p>San Javier</p>
                    <p>CA 123</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Invoice:</p>
                    <p>The Boring Company</p>
                    <p>Tesla Street</p>
                    <p>San Javier</p>
                    <p>CA 000</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <div>
                      <p className="font-bold text-slate-700">
                        Invoice Number:
                      </p>
                      <p>00{Math.floor(Math.random() * 1000)}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 mt-2">
                        Date of Issue
                      </p>
                      <p>{customer?.createdAt.substring(0, 10)}</p>
                    </div>
                  </div>
                  <div className="text-md text-slate-500 sm:display:block hidden">
                    <div>
                      <p className="font-bold text-slate-700 mt-2">Terms:</p>
                      <p>10 days</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">Due:</p>
                      <p>2023-11-22</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bill-table-area mt-8">
                <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                      >
                        Visual
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                      >
                        Title
                      </th>
                      <th
                        colSpan={4}
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                      >
                        Number
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer?.cartItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-t border-slate-200"
                      >
                        <td className="py-4 sm:table-cell hidden">
                          <img
                            src={item?.img}
                            alt=""
                            className="w-12 h-12 object-cover"
                          />
                        </td>
                        <td className="py-4 sm:table-cell hidden">
                          <div className="flex flex-col">
                            <span className="font-medium">{item?.title}</span>
                            <span className="sm:hidden inline-block text-xs">
                              {item?.price}₺
                            </span>
                          </div>
                        </td>
                        <td className="py-4 sm:hidden" colSpan={4}>
                          <div className="flex flex-col">
                            <span className="font-medium">{item?.title}</span>
                            <span className="sm:hidden inline-block text-xs">
                              Unit Price
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-center sm:table-cell hidden">
                          <span>{item?.price.toFixed(2)}₺</span>
                        </td>
                        <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                          <span>{item?.quantity}</span>
                        </td>
                        <td className="py-4 text-right">
                          <span>
                            {(item?.price * item?.quantity).toFixed(2)}₺
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        className="text-right pt-4 sm:table-cell hidden"
                        colSpan="4"
                        scope="row"
                      >
                        <span className="font-normal text-slate-600">
                          Sub Total
                        </span>
                      </th>
                      <th
                        className="text-left pt-4 sm:hidden"
                        scope="row"
                        colSpan="4"
                      >
                        <p className="font-normal text-slate-700">Sub Total</p>
                      </th>
                      <th scope="row" className="text-right pt-4">
                        <span className="font-normal text-slate-600">
                          {customer?.subTotal}
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="text-right pt-4 sm:table-cell hidden"
                        colSpan="4"
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">Vat</span>
                      </th>
                      <th
                        className="text-left pt-4 sm:hidden"
                        scope="row"
                        colSpan="4"
                      >
                        <p className="font-normal text-slate-700">Vat</p>
                      </th>
                      <th className="text-right pt-4" scope="row">
                        <span className="font-normal text-red-600">
                          {customer?.tax}
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="text-right pt-4 sm:table-cell hidden"
                        colSpan="4"
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">
                          Total
                        </span>
                      </th>
                      <th
                        className="text-left pt-4 sm:hidden"
                        scope="row"
                        colSpan="4"
                      >
                        <p className="font-normal text-slate-700">Total</p>
                      </th>
                      <th className="text-right pt-4" scope="row">
                        <span className="font-normal text-slate-700">
                          {customer?.total}
                        </span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
                <div className="py-9">
                  <div className="border-t pt-9 border-slate-200">
                    <p className="text-sm font-light text-slate-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Esse repellendus quis consequatur fugiat nihil, suscipit
                      officiis ipsum optio officia voluptates inventore
                      laboriosam debitis voluptas soluta asperiores accusamus
                      incidunt nesciunt velit culpa? Temporibus ullam deleniti
                      placeat, inventore ab eos atque at soluta similique, amet
                      porro. Repudiandae, deleniti enim ipsam inventore ut alias
                      illo repellendus, quo consectetur eaque ratione ullam
                      laboriosam nam eum vitae voluptatibus exercitationem
                      iusto. Consequatur minus voluptatum maiores sunt sint
                      deleniti culpa ratione neque esse quisquam corrupti quam a
                      ullam laboriosam quae aperiam, incidunt dolorem.
                      Exercitationem atque sit praesentium voluptatibus
                      assumenda? Dolores autem recusandae totam ullam, pariatur
                      qui ea?
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <Button onClick={handlePrint} type="primary" size="large">
            Print
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PrintBill;
