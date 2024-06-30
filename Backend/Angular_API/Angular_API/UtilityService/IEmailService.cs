using Angular_API.Models;

namespace Angular_API.UtilityService
{
	public interface IEmailService
	{
		void SendEmail(Email email);
	}
}
