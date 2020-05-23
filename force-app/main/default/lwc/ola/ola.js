import { LightningElement, track,wire } from 'lwc';
import BOOKING_OBJECT from '@salesforce/schema/BookingInfo__c';
import CAR_NAME from '@salesforce/schema/BookingInfo__c.Car_Name__c';
import CAR_NUMBER from '@salesforce/schema/BookingInfo__c.Car_Number__c';
import CAR_TYPE from '@salesforce/schema/BookingInfo__c.Car_Type__c';
import DRIVER_NAME from '@salesforce/schema/BookingInfo__c.Driver_Name__c';
import insertRecord from '@salesforce/apex/OlaBookingClass.insertRecord';
import getRecords from '@salesforce/apex/OlaBookingClass.getRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ola extends LightningElement 
{
    @track showModal=false;
    @track carName = CAR_NAME;
    @track carNumber = CAR_NUMBER;
    @track carType = CAR_TYPE;
    @track driverName = DRIVER_NAME;

    @wire(getRecords) bookings;

    rec = 
    {
        Car_Name__c : this.carName,
        Car_Number__c: this.industry,
        Car_Type__c:this.carType,
        Driver_Name__c : this.phone
    }
    openModal(event)
    {
        this.showModal=true;
        this.rec.Car_Type__c=event.target.label;
    }

    handleCarNameChange(event) {
        this.rec.Car_Name__c = event.target.value;
        
    }
    
    handleCarNumberChange(event) {
        this.rec.Car_Number__c = event.target.value;
    }
    
    handleDriverNameChange(event) {
        this.rec.Driver_Name__c = event.target.value;
    }

    book(event) 
    {
        insertRecord({ bookingInfo : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.Car_Name__c = '';
                    this.rec.Car_Number__c = '';
                    this.rec.Car_Type__c = '';
                    this.rec.Driver_Name__c = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                }
                this.showModal=false;
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                this.showModal=true;
                console.log("error", JSON.stringify(this.error));
            });
    }

    closeModal()
    {
        this.showModal=false;
    }

}