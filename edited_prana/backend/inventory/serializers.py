from rest_framework import serializers
from .models import Material, Supplier, PurchaseOrder, PurchaseOrderItem, StockTransaction
from users.models import User

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class SupplierListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'contact_person', 'email', 'phone', 'is_active']

class MaterialSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    
    class Meta:
        model = Material
        fields = '__all__'

class MaterialListSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    current_stock_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Material
        fields = ['id', 'name', 'category', 'unit', 'unit_price', 'current_stock', 
                 'minimum_stock', 'supplier_name', 'current_stock_display']
    
    def get_current_stock_display(self, obj):
        return f"{obj.current_stock} {obj.unit}"

class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    material_name = serializers.CharField(source='material.name', read_only=True)
    material_unit = serializers.CharField(source='material.unit', read_only=True)
    
    class Meta:
        model = PurchaseOrderItem
        fields = '__all__'

class PurchaseOrderSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    items = PurchaseOrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = PurchaseOrder
        fields = '__all__'

class PurchaseOrderListSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    item_count = serializers.SerializerMethodField()
    
    class Meta:
        model = PurchaseOrder
        fields = ['id', 'po_number', 'supplier_name', 'order_date', 
                 'expected_delivery', 'status', 'total_amount', 'item_count']
    
    def get_item_count(self, obj):
        return obj.items.count()

class StockTransactionSerializer(serializers.ModelSerializer):
    material_name = serializers.CharField(source='material.name', read_only=True)
    material_unit = serializers.CharField(source='material.unit', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = StockTransaction
        fields = '__all__'

class StockSummarySerializer(serializers.Serializer):
    material_id = serializers.IntegerField()
    material_name = serializers.CharField()
    category = serializers.CharField()
    unit = serializers.CharField()
    current_stock = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_value = serializers.DecimalField(max_digits=12, decimal_places=2)
    minimum_stock = serializers.DecimalField(max_digits=10, decimal_places=2)
    status = serializers.CharField()
