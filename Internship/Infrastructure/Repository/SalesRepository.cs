﻿using BackendApp.DataBaseContext;
using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Internship.DTO;

namespace BackendApp.Infrastructure.Repository
{
    public class SalesRepository:ISales
    {
        private readonly DbCntxt _dbCntxt;

        public SalesRepository(DbCntxt dbCntxt)
        {
            _dbCntxt = dbCntxt;
        }
        public async Task<bool> createAsync(Sales sale)
        {
            await _dbCntxt.sales.AddAsync(sale);

            return true;


        }

        public async Task<bool> DeleteAsync(int? id)
        {
            var sale = await _dbCntxt.sales.FindAsync(id);

            if (sale != null)
            {
                _dbCntxt.sales.Remove(sale);
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<SalesDto>> GetAllAsync()
        {
            var sal = _dbCntxt.sales.ToList();
            var cust = _dbCntxt.customers.ToList();
            var prod = _dbCntxt.products.ToList();
            var store = _dbCntxt.stores.ToList();


            var sale = (from s in sal
                       join cus in cust
                       on s.CustomerId equals cus.CustomerId
                       join pr in prod
                       on s.ProductId equals pr.ProductId
                       join st in store
                       on s.StoreId equals st.StoreId
                       select new SalesDto
                       {
                           customer =cus.Name,
                           product=pr.Name,
                           store=st.Name,
                           DateSold= s.DateSold,






                       }).ToList();

            if (sale != null)
            {
                return  sale;
            }
            return null;
        }

        public async Task<Sales> GetAsync(int? id)
        {
            var sale = await _dbCntxt.sales.FindAsync(id);

            if (sale != null)
            {

                return sale;
            }
            return null;

        }

        public async Task<bool> UpdateAsync(int? id, Sales sale)
        {

            var data = await _dbCntxt.sales.FindAsync(id);

            if (data != null)
            {
                _dbCntxt.sales.Attach(data);

                data.StoreId = sale.StoreId;
                data.CustomerId = sale.CustomerId;
                data.ProductId=sale.ProductId;  
                data.DateSold = sale.DateSold;



                return true;
            }
            return false;

        }
    }
}
