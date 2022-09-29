using BackendApp.Model;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.DataBaseContext
{
    public class DbCntxt : DbContext
    {
        public DbCntxt(DbContextOptions<DbCntxt> options):base(options)
        {

        }

        public DbSet<Sales> sales { get; set; }
        public DbSet<Customer> customers { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Store> stores { get; set; }
    }
}
