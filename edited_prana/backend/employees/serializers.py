from rest_framework import serializers
from .models import Supervisor, Labour, SalarySlip

class SupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supervisor
        fields = '__all__'

class SupervisorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supervisor
        fields = ['id', 'name', 'email', 'phone', 'designation','experience_years','salary', 'is_active']

class LabourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labour
        fields = '__all__'

class LabourListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labour
        fields = ['id', 'name', 'email', 'phone', 'work_type', 'daily_wage', 'is_active']

class SalarySlipSerializer(serializers.ModelSerializer):
    labour_name = serializers.CharField(source='labour.name', read_only=True)
    
    class Meta:
        model = SalarySlip
        fields = '__all__'

class SalarySlipListSerializer(serializers.ModelSerializer):
    labour_name = serializers.CharField(source='labour.name', read_only=True)
    
    class Meta:
        model = SalarySlip
        fields = ['id', 'labour_name', 'month', 'year', 'net_salary', 
                 'is_paid', 'generated_date']
