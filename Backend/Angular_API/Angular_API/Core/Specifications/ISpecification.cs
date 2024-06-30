using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        List<Expression<Func<T, object>>> Includes { get; }

        Expression<Func<T, object>> OrderByDescending { get; }
        
    }
}