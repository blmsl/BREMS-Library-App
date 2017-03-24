package appSpring.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Action {
	
	public interface Basic {}
	public interface Usr {}
	public interface ResoCopy {}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonView(Basic.class)
	private Integer id;

	@JsonView(Basic.class)
	private Date dateLoanInit;
	@JsonView(Basic.class)
	private Date dateLoanGiven;
	@JsonView(Basic.class)
	private Date dateLoanReturn;

	@ManyToOne
	@JsonView(ResoCopy.class)
	private ResourceCopy copy;

	@ManyToOne
	@JsonView(Usr.class)
	private User user;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	private Token token;

	protected Action() {
	}

	public Action(Date dateLoanInit) {
		this.dateLoanInit = dateLoanInit;
		dateLoanReturn = null;
		dateLoanGiven = null;
	}

	public Integer getID() {
		return id;
	}

	public void setID(Integer id) {
		this.id = id;
	}

	public Date getDateLoanInit() {
		return dateLoanInit;
	}

	public void setDateLoanInit(Date dateLoanInit) {
		this.dateLoanInit = dateLoanInit;
	}

	public Date getDateLoanGiven() {
		return dateLoanGiven;
	}

	public void setDateLoanGiven(Date dateLoanGiven) {
		this.dateLoanGiven = dateLoanGiven;
	}

	public Date getDateLoanReturn() {
		return dateLoanReturn;
	}

	public void setDateLoanReturn(Date dateLoanReturn) {
		this.dateLoanReturn = dateLoanReturn;
	}


	public ResourceCopy getResource() {
		return copy;
	}

	public void setResource(ResourceCopy copy) {
		this.copy = copy;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
