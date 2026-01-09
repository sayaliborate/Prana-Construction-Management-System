from django.db import models
from django.utils import timezone

class Supervisor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    designation = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField(default=0)
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employees_supervisor'
        ordering = ['name']

    def __str__(self):
        return self.name

class Labour(models.Model):
    WORK_TYPE_CHOICES = [
        ('skilled', 'Skilled'),
        ('semi_skilled', 'Semi-Skilled'),
        ('unskilled', 'Unskilled'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    work_type = models.CharField(max_length=20, choices=WORK_TYPE_CHOICES)
    daily_wage = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    monthly_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    bank_account = models.CharField(max_length=20, blank=True, null=True)
    ifsc_code = models.CharField(max_length=11, blank=True, null=True)
    pan_number = models.CharField(max_length=10, blank=True, null=True)
    aadhar_number = models.CharField(max_length=12, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employees_labour'
        ordering = ['name']

    def __str__(self):
        return self.name

class SalarySlip(models.Model):
    labour = models.ForeignKey(Labour, on_delete=models.CASCADE, related_name='salary_slips')
    month = models.PositiveIntegerField()
    year = models.PositiveIntegerField()
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    overtime_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    overtime_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deduction = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gross_salary = models.DecimalField(max_digits=10, decimal_places=2)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2)
    generated_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    paid_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'employees_salaryslip'
        unique_together = ['labour', 'month', 'year']
        ordering = ['-year', '-month']

    def __str__(self):
        return f"{self.labour.name} - {self.month}/{self.year}"
