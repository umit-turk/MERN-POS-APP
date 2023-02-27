import { Button, Modal } from "antd";

const PrintBill = ({ setModalOpen, isModalOpen }) => {
  return (
    <>
      <Modal
        title="Print Invoice"
        open={isModalOpen}
        footer={false}
        onCancel={setModalOpen}
        width={800}
      >
        <section className="py-20 bg-black">
          <div className="max-w-5xl mx-auto bg-white px-6">
            <article className="overflow-hidden">
              <div className="logo my-6">
                <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
              </div>
              <div className="bill-details">
                <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Invoice Detail:</p>
                    <p>Unwrapped</p>
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
                      <p>00041</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 mt-2">
                        Date of Issue
                      </p>
                      <p>2022-11-22</p>
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
                        className="py-3.5 text-left text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                      >
                        Visual
                      </th>
                      <th
                        scope="col"
                        className="w-full py-3.5 sm:text-center text-left text-sm font-normal text-slate-700  md:pl-0  sm:hidden"
                      >
                        Title
                      </th>
                      <th
                      colSpan={4}
                        scope="col"
                        className="w-full py-3.5 sm:text-center text-left text-sm font-normal text-slate-700  md:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                      >
                        Number
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-right text-sm font-normal text-slate-700  md:pl-0"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-t border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src="https://picsum.photos/200/300"
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:text-center text-left">
                        <div className="flex flex-col">
                        <span className="font-medium">Sample 1</span>
                        <span className="sm:hidden inline-block text-xs">Unit Price 5₺</span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>5₺</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>1</span>
                      </td>
                      <td className="py-4 text-right">
                        <span>100₺</span>
                      </td>
                    </tr>
                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={4} scope="row" className="text-right pt-4 sm:table-cell hidden">
                        <span className="font-normal text-slate-600">
                          Sub Total
                        </span>
                      </th>
                      <th  colSpan={4}  scope="row" className="text-left pt-4 sm:hidden">
                        <p className="font-normal text-slate-600">
                          Sub Total
                        </p>
                      </th>
                      <th scope="row" className="text-right pt-4">
                        <span className="font-normal text-slate-600">60₺</span>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4} scope="row" className="text-right pt-4">
                        <span className="font-normal text-slate-600">Vat</span>
                      </th>
                      <th scope="row" className="text-right pt-4">
                        <span className="font-normal text-red-600">+4.80₺</span>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4} scope="row" className="text-right pt-4">
                        <span className="font-normal text-slate-600">
                          Total
                        </span>
                      </th>
                      <th scope="row" className="text-right pt-4">
                        <span className="font-normal text-slate-600">55₺</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
                <div className="py-9">
                  <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Esse repellendus quis consequatur fugiat nihil, suscipit
                    officiis ipsum optio officia voluptates inventore laboriosam
                    debitis voluptas soluta asperiores accusamus incidunt
                    nesciunt velit culpa? Temporibus ullam deleniti placeat,
                    inventore ab eos atque at soluta similique, amet porro.
                    Repudiandae, deleniti enim ipsam inventore ut alias illo
                    repellendus, quo consectetur eaque ratione ullam laboriosam
                    nam eum vitae voluptatibus exercitationem iusto. Consequatur
                    minus voluptatum maiores sunt sint deleniti culpa ratione
                    neque esse quisquam corrupti quam a ullam laboriosam quae
                    aperiam, incidunt dolorem. Exercitationem atque sit
                    praesentium voluptatibus assumenda? Dolores autem recusandae
                    totam ullam, pariatur qui ea?
                  </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <Button type="primary" size="large">Print</Button>
        </div>
      </Modal>
    </>
  );
};

export default PrintBill;
