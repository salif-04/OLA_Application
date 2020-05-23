public with sharing class OlaBookingClass 
{
    @AuraEnabled
    public static void insertRecord(BookingInfo__c bookingInfo)
    {
        insert bookingInfo;
    }

    @AuraEnabled(cacheable=true)
    public static list<BookingInfo__c> getRecords()
    {
        return [select Car_Name__c,Car_Number__c,Car_Type__c,Driver_Name__c from BookingInfo__c];
    }
}