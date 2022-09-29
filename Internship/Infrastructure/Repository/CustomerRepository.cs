using BackendApp.DataBaseContext;
using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;

namespace BackendApp.Infrastructure.Repository
{
    public class CustomerRepository : ICustomer
    {
        private readonly DbCntxt _dbCntxt;

        public CustomerRepository(DbCntxt dbCntxt)
        {
            _dbCntxt = dbCntxt;
        }
        public async Task<bool> createAsync(Customer customer)
        {
            await _dbCntxt.customers.AddAsync(customer);

            return true;
            
            
        }

        public async Task<bool> DeleteAsync(int? id)
        {
            var customer = await _dbCntxt.customers.FindAsync(id);

            if(customer != null)
            {
                _dbCntxt.customers.Remove(customer);
                return true;
            }
            return false;
        }

        public  IEnumerable<Customer> GetAllAsync()  
        {
            //var customer =  _dbCntxt.customers.ToList();
            var sales = _dbCntxt.sales.ToList();
            var customer = _dbCntxt.customers.ToList();

            var cust = customer.Join(sales, st => st.CustomerId,
                sl => sl.SalesId,
                (st, sl) => new Customer
                {
                    Name = st.Name,
                    Address = st.Address,
                    //Sales = sl.DateSold
                }).ToList();

            if(cust != null)
            {
                return cust;
            }
            return null;
        }       

        public async Task<Customer> GetAsync(int? id)
        {
            var customer = await _dbCntxt.customers.FindAsync(id);

            if (customer != null)
            {
                
                return customer;
            }
             return null;

        }

        public async Task<bool> UpdateAsync(int? id, Customer customer)
        {

            var data = await _dbCntxt.customers.FindAsync(id);

            if (data != null)
            {
                _dbCntxt.customers.Attach(data);

                data.Name = customer.Name;  

                data.Address = customer.Address;

                
                
                return true;
            }
            return false;

        }
    }
}
